import { type KeyObject, generateKeyPairSync } from 'crypto';
import { sign } from 'jsonwebtoken';

export type KeyPair = {
  publicKey: KeyObject;
  privateKey: KeyObject;
};
export type CreateTokenPairValidOptions = {
  accessTokenExpiresIn: string | number;
  refreshTokenExpiresIn: string | number;
};

export class AuthUtils {
  static generateKeyPair(): KeyPair {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
    });
    return {
      privateKey,
      publicKey,
    };
  }

  static createTokenPair(
    payload: Record<string, unknown>,
    privateKey: KeyObject,
    { accessTokenExpiresIn, refreshTokenExpiresIn }: CreateTokenPairValidOptions
  ): {
    accessToken: string;
    refreshToken: string;
  } {
    // create accessToken using private key
    const accessToken = sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: accessTokenExpiresIn,
    });
    // create refreshToken using private key
    const refreshToken = sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default AuthUtils;
