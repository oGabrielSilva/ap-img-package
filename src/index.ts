import ImageControl from './Module/Image';

export const toDataURL = async (image: File, width: number, height: number) => {
  const control = new ImageControl(width, height);
  return await control.toDataURL(image);
};
