declare class ImageControl {
    private readonly width;
    private readonly height;
    private readonly image;
    private readonly canvas;
    private readonly context;
    constructor(width: number, height: number);
    toDataURL(image: File): Promise<string | null>;
    toDataURLByBase64(image: string): void;
    private clearCanvas;
}
export default ImageControl;
