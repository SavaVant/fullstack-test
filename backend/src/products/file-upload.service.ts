import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  private readonly uploadsFolder = 'uploads';

  constructor() {
    // Создаем папку для загрузок, если её нет
    fs.mkdir(this.uploadsFolder, { recursive: true });
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadsFolder, fileName);

    await fs.writeFile(filePath, file.buffer);

    return fileName;
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadsFolder, fileName);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
}
