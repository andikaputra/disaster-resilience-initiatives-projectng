export class DefaultException extends Error {
  constructor(message = '500 : Terjadi gangguan pada server', public readonly data: {
    code?: string,
    title?: string,
    subTitle?: string,
  } = {
      code: '500',
      title: '500 : Terjadi gangguan pada server',
      subTitle: 'Terjadi gangguan',
    }) {
    super(message ?? 'Sorry for an error, check your connection or try a few more moments.');
    this.name = 'DefaultException';
  }
}
