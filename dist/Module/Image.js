"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ImageControl {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.image = new Image();
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    toDataURL(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUrl = yield new Promise((resolve) => {
                this.clearCanvas();
                const url = URL.createObjectURL(image);
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.image.onload = (e) => {
                    try {
                        const imageWith = e.target.width;
                        const imageheight = e.target.height;
                        const w = imageWith > this.width ? Math.abs(imageWith - this.width) : this.width;
                        const h = imageheight > this.height ? Math.abs(imageheight - this.height) : this.height;
                        this.context.drawImage(this.image, w, h);
                        const dataUrl = this.context.canvas.toDataURL();
                        resolve(dataUrl);
                    }
                    catch (error) {
                        resolve(null);
                    }
                };
                this.image.src = url;
            });
            return dataUrl;
        });
    }
    toDataURLByBase64(image) { }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
exports.default = ImageControl;
