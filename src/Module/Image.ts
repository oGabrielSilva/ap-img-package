class ImageControl {
  private readonly image: HTMLImageElement = new Image();
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly width: number, private readonly height: number) {
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public async toDataURL(image: File) {
    const dataUrl = await new Promise<string | null>((resolve) => {
      this.clearCanvas();
      const url = URL.createObjectURL(image);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.image.onload = (e) => {
        try {
          const imageWith = (e.target as HTMLImageElement).width;
          const imageheight = (e.target as HTMLImageElement).height;
          const w = imageWith > this.width ? Math.abs(imageWith - this.width) : this.width;
          const h = imageheight > this.height ? Math.abs(imageheight - this.height) : this.height;
          this.context.drawImage(this.image, w, h);
          const dataUrl = this.context.canvas.toDataURL();
          resolve(dataUrl);
        } catch (error) {
          resolve(null);
        }
      };
      this.image.src = url;
    });
    return dataUrl;
  }

  public toDataURLByBase64(image: string) {}

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default ImageControl;
