import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  /**
   * Initialize email transporter
   * Supports SMTP configuration via environment variables
   */
  private initializeTransporter() {
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT') || 587;
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPassword = this.configService.get<string>('SMTP_PASSWORD');
    const fromEmail = this.configService.get<string>('SMTP_FROM_EMAIL');

    if (!smtpHost || !smtpUser || !smtpPassword) {
      this.logger.warn(
        'Email service not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    this.logger.log('Email service initialized');
  }

  /**
   * Send email for new contact submission
   */
  async sendContactNotification(data: {
    name: string;
    surname: string;
    email: string;
    message: string;
    adminEmail: string;
  }): Promise<boolean> {
    if (!this.transporter) {
      this.logger.warn('Email service not configured. Skipping notification.');
      return false;
    }

    try {
      await this.transporter.sendMail({
        from:
          this.configService.get<string>('SMTP_FROM_EMAIL') ||
          'noreply@portfolio.dev',
        to: data.adminEmail,
        subject: `New Contact Submission from ${data.name} ${data.surname}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${data.name} ${data.surname}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: data.email,
      });

      this.logger.log(`Contact notification sent to ${data.adminEmail}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send contact notification', error);
      return false;
    }
  }

  /**
   * Send confirmation email to contact form submitter
   */
  async sendContactConfirmation(data: {
    email: string;
    name: string;
  }): Promise<boolean> {
    if (!this.transporter) {
      this.logger.warn('Email service not configured. Skipping confirmation.');
      return false;
    }

    try {
      await this.transporter.sendMail({
        from:
          this.configService.get<string>('SMTP_FROM_EMAIL') ||
          'noreply@portfolio.dev',
        to: data.email,
        subject: 'We received your message',
        html: `
          <h2>Thank You for Contacting Us</h2>
          <p>Hi ${data.name},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Portfolio Team</p>
        `,
      });

      this.logger.log(`Confirmation email sent to ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send confirmation email', error);
      return false;
    }
  }

  /**
   * Test email configuration
   */
  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      this.logger.warn('Email service not configured');
      return false;
    }

    try {
      await this.transporter.verify();
      this.logger.log('Email service connection verified');
      return true;
    } catch (error) {
      this.logger.error('Email service connection failed', error);
      return false;
    }
  }
}
