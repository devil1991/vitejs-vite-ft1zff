import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class SVGImageGen extends LitElement {
    fileInput: HTMLInputElement;
    svgContainer: HTMLDivElement;
    svgImages: SVGImageElement[];
    createRenderRoot(): this;
    _handleFileSelect(): void;
    _handleSVGImageSelect(svgImage: any): (event: any) => Promise<void>;
    _imageLayerInputs(): import("lit-html").TemplateResult<1>[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'svg-image-gen': SVGImageGen;
    }
}
