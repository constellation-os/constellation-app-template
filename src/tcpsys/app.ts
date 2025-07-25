export default class TemplateApp extends Application {
	time: Number = Date.now();
	hasClickedTheButton: Boolean = false;

	async init() {
		this.name = "Template App";

		this.renderer.setIcon("gallery-thumbnails");
		this.renderer.renameWindow("Template App");
	}

	frame() {
		this.renderer.clear(); // clear staged commits

		this.renderer.icon(0, 0, "circle-user"); // 24x24
		this.renderer.text(24, 0, "Template App");

		let textWidth = 0;
		if (this.hasClickedTheButton) {
			this.renderer.text(0, 100, "Button was last pressed at: ");
			textWidth = this.renderer.getTextWidth(
				"Button was last pressed at: "
			); // calculate how wide the text is...
		} else {
			this.renderer.text(0, 100, "App was started at: ");
			textWidth = this.renderer.getTextWidth("App was started at: "); // calculate how wide the text is...
		}

		const timeText = this.renderer.text(textWidth, 100, String(this.time)); // so we can display the next bit next to it

		// make the time clickable...
		this.renderer.onClick(timeText, () => {
			this.hasClickedTheButton = true;
			this.time = Date.now();
		});

		this.renderer.commit(); // display it
	}
}
