import { Injectable } from '@nestjs/common';
import { gzipSync, gunzipSync } from 'zlib';

@Injectable()
export class CompressionProvider {
  private readonly COMPRESSION_STRING_DELIMITER = 'COMPR_';
  private readonly COMPRESSION_ENCODING = 'base64';

  constructor(private readonly controls: { active: boolean }) {}

  public compress(data: string): string {
    try {
      if (this.controls.active && data) {
        const compressed = gzipSync(data).toString(this.COMPRESSION_ENCODING);
        return `${this.COMPRESSION_STRING_DELIMITER}${compressed}`;
      }
      return data;
    } catch (error) {
      throw new Error(`Error compressing data: ${error.message}`);
    }
  }

  public decompress(data: string) {
    try {
      if (
        this.controls.active &&
        data &&
        data.startsWith(this.COMPRESSION_STRING_DELIMITER)
      ) {
        const compressed = data.replace(this.COMPRESSION_STRING_DELIMITER, '');
        return gunzipSync(
          Buffer.from(compressed, this.COMPRESSION_ENCODING),
        ).toString();
      }
    } catch (error) {
      throw new Error(`Error decompressing data: ${error.message}`);
    }
    return data;
  }
}
