<#
.SYNOPSIS
Collect contents of files matching patterns into a single Markdown file.

.DESCRIPTION
Accepts file paths, folder paths, or glob patterns (including brace expansion).
Supports **, *, ? wildcards similar to Git pathspec.
Each file is written as a Markdown section with a heading (relative path)
followed by a fenced code block.

.PARAMETER Source
One or more file paths, folder paths, or glob patterns to collect.
Supports wildcards: * (any file segment), ** (recursive), ? (single char)
Supports brace expansion: {src,lib}/**/*.js
Defaults to current directory.

.PARAMETER Output
Path to output markdown file. Defaults to ./COLLECTED.md

.PARAMETER Recurse
Switch - when set, enumerates files recursively inside directories
(also implied by ** in glob patterns).

.PARAMETER RespectGitIgnore
Switch - when set, attempts to read .gitignore and use those patterns as excludes.

.PARAMETER Exclude
Array of glob patterns to exclude (e.g. "node_modules/**", "**/*.min.js").
Use ! prefix to re-include previously excluded files (e.g. "!src/important.min.js").

.EXAMPLE
# Collect all PowerShell files recursively
PS> .\collect-files-to-markdown.ps1 -Source "**/*.ps1"

.EXAMPLE
# Exclude markdown files
PS> .\collect-files-to-markdown.ps1 -Source "**/*" -Exclude "**/*.md"

.EXAMPLE
# Exclude node_modules but re-include a specific package
PS> .\collect-files-to-markdown.ps1 -Source "**/*.js" -Exclude "node_modules/**","!node_modules/lodash/**"

.EXAMPLE
# Collect TypeScript files from multiple directories
PS> .\collect-files-to-markdown.ps1 -Source "{src,lib}/**/*.ts"

.EXAMPLE
# Multiple exclusions
PS> .\collect-files-to-markdown.ps1 -Source "." -Recurse -Exclude "**/*.md","**/*.txt","dist/**"
#>

param(
    [Parameter(Mandatory = $false)] [string[]]$Source = @("."),
    [Parameter(Mandatory = $false)] [string]$Output = "./COLLECTED.md",
    [Parameter(Mandatory = $false)] [switch]$Recurse,
    [Parameter(Mandatory = $false)] [switch]$RespectGitIgnore,
    [Parameter(Mandatory = $false)] [string[]]$Exclude = @()
)

#region Helper Functions

function Convert-GlobToRegex {
    param([string]$glob)
    if (-not $glob) { return '(?i)^$' }

    $g = $glob.Replace('\', '/').Trim()
    $g = $g -replace '/+', '/'

    $dsPlaceholder = '<<DS>>'
    $g = $g -replace '\*\*', $dsPlaceholder

    $esc = [regex]::Escape($g)
    $esc = $esc -replace [regex]::Escape($dsPlaceholder), '.*'
    $esc = $esc -replace '\\\*', '[^/]*'
    $esc = $esc -replace '\\\?', '.'

    return '(?i)^' + $esc
}

function Expand-BracePattern {
    param([string]$pattern)
    
    if ($pattern -notmatch '\{[^}]+\}') {
        return @($pattern)
    }
    
    $results = @($pattern)
    $maxIterations = 50
    $iteration = 0
    
    while (($results | Where-Object { $_ -match '\{[^}]+\}' }) -and $iteration -lt $maxIterations) {
        $iteration++
        $newResults = @()
        foreach ($p in $results) {
            if ($p -match '^(.*?)\{([^}]+)\}(.*)$') {
                $prefix = $matches[1]
                $alternatives = $matches[2] -split ','
                $suffix = $matches[3]
                foreach ($alt in $alternatives) {
                    $newResults += "$prefix$alt$suffix"
                }
            }
            else {
                $newResults += $p
            }
        }
        $results = $newResults
    }
    
    return $results
}

function Test-IsGlobPattern {
    param([string]$path)
    return $path -match '[\*\?\[]' -or $path -match '\{[^}]*,[^}]*\}'
}

function Get-GlobBaseDirectory {
    param([string]$pattern)
    
    $normalized = $pattern.Replace('\', '/')
    if ($normalized.StartsWith('./')) {
        $normalized = $normalized.Substring(2)
    }
    
    $parts = @($normalized -split '/')
    $baseParts = @()
    
    foreach ($part in $parts) {
        if ($part -match '[\*\?\[\{]') {
            break
        }
        if ($part -ne '' -and $part -ne '.') {
            $baseParts += $part
        }
    }
    
    if ($baseParts.Count -eq 0) {
        return "."
    }
    
    return $baseParts -join '/'
}

function Get-GlobSuffix {
    param([string]$pattern, [string]$baseDir)
    
    $normalized = $pattern.Replace('\', '/')
    if ($normalized.StartsWith('./')) {
        $normalized = $normalized.Substring(2)
    }
    
    $baseDirNorm = $baseDir.Replace('\', '/')
    if ($baseDirNorm -eq '.' -or $baseDirNorm -eq '') {
        return $normalized
    }
    
    if ($normalized.StartsWith("$baseDirNorm/")) {
        return $normalized.Substring($baseDirNorm.Length + 1)
    }
    
    return $normalized
}

function Get-SourceFiles {
    param(
        [string[]]$Patterns,
        [switch]$Recurse
    )
    
    $results = [System.Collections.ArrayList]::new()
    $seenPaths = @{}
    
    foreach ($pattern in $Patterns) {
        $expandedPatterns = Expand-BracePattern -pattern $pattern
        
        foreach ($p in $expandedPatterns) {
            $p = $p.Trim()
            if (-not $p) { continue }
            
            if (Test-IsGlobPattern -path $p) {
                $baseDir = Get-GlobBaseDirectory -pattern $p
                $globPart = Get-GlobSuffix -pattern $p -baseDir $baseDir
                
                $resolvedBase = Resolve-Path -Path $baseDir -ErrorAction SilentlyContinue
                if (-not $resolvedBase) {
                    Write-Warning "Base directory '$baseDir' does not exist for pattern '$p'"
                    continue
                }
                $resolvedBase = $resolvedBase.Path
                
                $useRecurse = ($globPart -match '\*\*') -or $Recurse
                
                if ($useRecurse) {
                    $candidates = Get-ChildItem -Path $resolvedBase -File -Recurse -ErrorAction SilentlyContinue
                }
                else {
                    $candidates = Get-ChildItem -Path $resolvedBase -File -ErrorAction SilentlyContinue
                }
                
                $regex = Convert-GlobToRegex -glob $globPart
                
                foreach ($f in $candidates) {
                    $rel = [IO.Path]::GetRelativePath($resolvedBase, $f.FullName).Replace('\', '/')
                    if ($rel -match $regex) {
                        if (-not $seenPaths.ContainsKey($f.FullName)) {
                            $seenPaths[$f.FullName] = $true
                            [void]$results.Add(@{
                                    File    = $f
                                    BaseDir = $resolvedBase
                                })
                        }
                    }
                }
            }
            else {
                $resolved = Resolve-Path -Path $p -ErrorAction SilentlyContinue
                if (-not $resolved) {
                    Write-Warning "Source path '$p' does not exist"
                    continue
                }
                $resolved = $resolved.Path
                
                $item = Get-Item -Path $resolved -ErrorAction SilentlyContinue
                if ($item.PSIsContainer) {
                    if ($Recurse) {
                        $dirFiles = Get-ChildItem -Path $resolved -File -Recurse -ErrorAction SilentlyContinue
                    }
                    else {
                        $dirFiles = Get-ChildItem -Path $resolved -File -ErrorAction SilentlyContinue
                    }
                    foreach ($f in $dirFiles) {
                        if (-not $seenPaths.ContainsKey($f.FullName)) {
                            $seenPaths[$f.FullName] = $true
                            [void]$results.Add(@{
                                    File    = $f
                                    BaseDir = $resolved
                                })
                        }
                    }
                }
                else {
                    if (-not $seenPaths.ContainsKey($item.FullName)) {
                        $seenPaths[$item.FullName] = $true
                        $parentDir = Split-Path $resolved -Parent
                        if (-not $parentDir) { $parentDir = (Get-Location).Path }
                        [void]$results.Add(@{
                                File    = $item
                                BaseDir = $parentDir
                            })
                    }
                }
            }
        }
    }
    
    return $results.ToArray()
}

function Get-CommonBaseDirectory {
    param([string[]]$Directories)
    
    if ($Directories.Count -eq 0) {
        return (Get-Location).Path
    }
    
    $unique = $Directories | Sort-Object -Unique
    if ($unique.Count -eq 1) {
        return $unique[0]
    }
    
    $normalized = $unique | ForEach-Object { 
        $path = $_.Replace('\', '/')
        if ($path.EndsWith('/')) { $path = $path.Substring(0, $path.Length - 1) }
        $path
    }
    
    $splitPaths = @($normalized | ForEach-Object { , @($_ -split '/') })
    $minLength = ($splitPaths | ForEach-Object { $_.Count } | Measure-Object -Minimum).Minimum
    
    $commonParts = @()
    for ($i = 0; $i -lt $minLength; $i++) {
        $part = $splitPaths[0][$i]
        $allMatch = $true
        foreach ($sp in $splitPaths) {
            if ($sp[$i] -ne $part) {
                $allMatch = $false
                break
            }
        }
        if ($allMatch) {
            $commonParts += $part
        }
        else {
            break
        }
    }
    
    if ($commonParts.Count -eq 0) {
        return (Get-Location).Path
    }
    
    $common = $commonParts -join [IO.Path]::DirectorySeparatorChar
    if (Test-Path $common) {
        return (Resolve-Path $common).Path
    }
    
    return (Get-Location).Path
}

function Get-GitIgnorePatterns {
    param([string]$folder)
    $gitignore = Join-Path -Path $folder -ChildPath '.gitignore'
    if (-not (Test-Path $gitignore)) { return @() }
    $lines = Get-Content -Path $gitignore -ErrorAction SilentlyContinue | Where-Object { $_ -and -not $_.TrimStart().StartsWith('#') }
    return $lines
}

function Test-BinaryFile {
    param([string]$path)
    try {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        foreach ($b in $bytes) { if ($b -eq 0) { return $true } }
        return $false
    }
    catch {
        return $true
    }
}

function Get-LanguageFromExtension {
    param([string]$ext)
    switch ($ext.ToLower()) {
        '.py' { 'python'; break }
        '.js' { 'javascript'; break }
        '.ts' { 'typescript'; break }
        '.tsx' { 'typescript'; break }
        '.ps1' { 'powershell'; break }
        '.psm1' { 'powershell'; break }
        '.sh' { 'bash'; break }
        '.cfg' { 'config'; break }
        '.md' { 'markdown'; break }
        '.ini' { 'ini'; break }
        '.tf' { 'terraform'; break }
        '.j2' { 'jinja2'; break }
        '.json' { 'json'; break }
        '.yaml' { 'yaml'; break }
        '.yml' { 'yaml'; break }
        '.xml' { 'xml'; break }
        '.html' { 'html'; break }
        '.css' { 'css'; break }
        '.java' { 'java'; break }
        '.dart' { 'dart'; break }
        '.c' { 'c'; break }
        '.cpp' { 'cpp'; break }
        '.cs' { 'csharp'; break }
        '.go' { 'go'; break }
        '.rb' { 'ruby'; break }
        '.php' { 'php'; break }
        '.sql' { 'sql'; break }
        '.txt' { ''; break }
        default { '' }
    }
}

#endregion

#region Main Logic

# Collect files from source patterns
$sourceResults = Get-SourceFiles -Patterns $Source -Recurse:$Recurse

if ($sourceResults.Count -eq 0) {
    Write-Warning "No files matched the source pattern(s): $($Source -join ', ')"
}

# Determine common base directory for relative paths in headings
$baseDirs = @($sourceResults | ForEach-Object { $_.BaseDir } | Sort-Object -Unique)
$resolvedSource = Get-CommonBaseDirectory -Directories $baseDirs

# The CWD is used as the reference point for matching -Exclude patterns,
# so that patterns like "src/**/*.spec.ts" resolve correctly regardless of
# which sub-directory was used as the source base.
$cwd = (Get-Location).Path

# Build exclude and include lists
$allExcludeGlobs = @()
if ($RespectGitIgnore) {
    $gitIgnorePatterns = Get-GitIgnorePatterns -folder $resolvedSource
    if ($gitIgnorePatterns) {
        # Compute the relative path from $cwd to $resolvedSource to prefix gitignore patterns
        # so they match against $cwd-relative file paths
        $prefixPath = [IO.Path]::GetRelativePath($cwd, $resolvedSource).Replace('\', '/')
        foreach ($pattern in $gitIgnorePatterns) {
            if ($prefixPath -and $prefixPath -ne '.') {
                $adjustedPattern = "$prefixPath/$pattern"
            }
            else {
                $adjustedPattern = $pattern
            }
            $allExcludeGlobs += $adjustedPattern
        }
    }
}
if ($Exclude) {
    foreach ($p in $Exclude) {
        if ($p -and $p.Trim()) {
            $parts = $p -split ','
            foreach ($part in $parts) {
                if ($part -and $part.Trim()) { $allExcludeGlobs += $part.Trim() }
            }
        }
    }
}

# Separate include (negation) patterns from exclude globs
$excludeGlobs = @()
$includeGlobs = @()
foreach ($g in $allExcludeGlobs) {
    $norm = $g.Trim()
    if ($norm -eq '*') { $norm = '**' }
    if ($norm.StartsWith('./')) { $norm = $norm.Substring(2) }
    if ($norm.StartsWith('/')) { $norm = $norm.Substring(1) }

    if ($norm.StartsWith('!')) {
        $pat = $norm.Substring(1)
        if (-not $pat) { continue }
        if ($pat -notmatch '[*?]' -and -not ($pat -like '*/*')) {
            $pat = "$pat/**"
        }
        $includeGlobs += $pat
    }
    else {
        if ($norm -notmatch '[*?]' -and -not ($norm -like '*/*')) {
            $norm = "$norm/**"
        }
        $excludeGlobs += $norm
    }
}

# Convert globs to regexes
$excludeRegexes = @()
foreach ($g in $excludeGlobs) {
    if ($g -and $g.Trim()) { $excludeRegexes += (Convert-GlobToRegex -glob $g.Trim()) }
}
$includeRegexes = @()
foreach ($g in $includeGlobs) {
    if ($g -and $g.Trim()) { $includeRegexes += (Convert-GlobToRegex -glob $g.Trim()) }
}

# Extract just the file objects
$files = @($sourceResults | ForEach-Object { $_.File })

# Filter excludes / include overrides.
# IMPORTANT: use $cwd-relative paths when testing exclude/include regexes so that
# patterns supplied by the caller (e.g. "src/**/*.spec.ts") match correctly even
# when the resolved source base has already stripped the leading "src/" segment.
if ($excludeRegexes.Count -gt 0 -or $includeRegexes.Count -gt 0) {
    if ($excludeRegexes.Count -eq 0) {
        $files = $files | Where-Object {
            $rel = [IO.Path]::GetRelativePath($cwd, $_.FullName).Replace('\', '/')
            $keep = $false
            foreach ($irx in $includeRegexes) {
                if ($rel -match $irx) { $keep = $true; break }
            }
            $keep
        }
    }
    else {
        $files = $files | Where-Object {
            $rel = [IO.Path]::GetRelativePath($cwd, $_.FullName).Replace('\', '/')
            $skip = $false
            foreach ($rx in $excludeRegexes) {
                if ($rel -match $rx) { $skip = $true; break }
            }
            if ($skip -and $includeRegexes.Count -gt 0) {
                foreach ($irx in $includeRegexes) {
                    if ($rel -match $irx) { $skip = $false; break }
                }
            }
            -not $skip
        }
    }
}

if ($files.Count -eq 0) {
    Write-Host "No files found matching patterns (after excludes). Output file will still be created."
}

# Prepare output directory
$parent = Split-Path -Path $Output -Parent
if (-not $parent -or $parent -eq '') {
    $parent = '.'
}
if (-not (Test-Path $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
}

# Write output
$sourceDisplay = if ($Source.Count -eq 1) { $Source[0] } else { "[$($Source -join ', ')]" }
"# Source: $sourceDisplay`n" | Out-File -FilePath $Output -Encoding utf8

foreach ($f in $files) {
    try {
        if (Test-BinaryFile -path $f.FullName) {
            Write-Host "Skipping binary file: $($f.FullName)"
            continue
        }
        $rel = [IO.Path]::GetRelativePath($resolvedSource, $f.FullName) -replace '\\', '/'
        if ($rel -eq $f.FullName) { $rel = $f.Name }
        "`n## $rel`n" | Out-File -FilePath $Output -Encoding utf8 -Append

        $text = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction Stop
        $lang = Get-LanguageFromExtension -ext $f.Extension

        if ($f.Extension -ieq '.md') {
            $fenceLen = 4
        }
        else {
            $tickMatches = [regex]::Matches($text, '(`+)', 'Singleline')
            $maxTicks = 0
            foreach ($m in $tickMatches) { if ($m.Groups[1].Value.Length -gt $maxTicks) { $maxTicks = $m.Groups[1].Value.Length } }
            $fenceLen = [Math]::Max(3, $maxTicks + 1)
        }
        $fence = ('`' * $fenceLen)

        if ($lang) { "$fence$lang`n" | Out-File -FilePath $Output -Encoding utf8 -Append } 
        else { "$fence`n" | Out-File -FilePath $Output -Encoding utf8 -Append }

        $text | Out-File -FilePath $Output -Encoding utf8 -Append
        "$fence`n" | Out-File -FilePath $Output -Encoding utf8 -Append

        Write-Host "Appended: $rel"
    }
    catch {
        Write-Warning "Failed to read $($f.FullName): $_"
    }
}

Write-Host "Done. Output written to: $Output"

#endregion
