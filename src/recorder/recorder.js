export class Recorder {
  constructor(canvas, audioDestination) {
    this.canvas = canvas;
    this.audioDestination = audioDestination;
    this.mediaRecorder = null;
    this.chunks = [];
    this.isRecording = false;
  }

  start() {
    const canvasStream = this.canvas.captureStream(60);
    const combined = new MediaStream([
      ...canvasStream.getTracks(),
      ...this.audioDestination.stream.getTracks(),
    ]);

    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';

    this.mediaRecorder = new MediaRecorder(combined, {
      mimeType,
      videoBitsPerSecond: 8_000_000,
    });

    this.chunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gazaidev_${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      this.isRecording = false;
    };

    this.mediaRecorder.start(1000);
    this.isRecording = true;
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }
}
