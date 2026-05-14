/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  private uploadDir = path.join(process.cwd(), 'public', 'uploads');
  private maxFileSize = 5 * 1024 * 1024; // 5MB
  private allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * Upload file to local storage
   */
  async uploadFile(file: Express.Multer.File): Promise<{
    url: string;
    filename: string;
    size: number;
  }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    // Validate file type
    if (!this.allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedMimes.join(', ')}`,
      );
    }

    // Create upload directory if it doesn't exist
    await fs.mkdir(this.uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${random}${ext}`;
    const filepath = path.join(this.uploadDir, filename);

    // Write file to disk
    await fs.writeFile(filepath, file.buffer);

    // Return public URL
    return {
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
    };
  }

  /**
   * Delete file from storage
   */
  async deleteFile(filename: string): Promise<void> {
    const filepath = path.join(this.uploadDir, filename);

    try {
      await fs.unlink(filepath);
    } catch {
      throw new BadRequestException('Failed to delete file');
    }
  }

  /**
   * Validate filename to prevent directory traversal attacks
   */
  private validateFilename(filename: string): boolean {
    if (
      filename.includes('..') ||
      filename.includes('/') ||
      filename.includes('\\')
    ) {
      return false;
    }
    return true;
  }
}
