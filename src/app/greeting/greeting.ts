export class Greeting {
  state = 'unstated';
  constructor(public message: string, public duration: number, public faceId: number) {}

  cycleState () {
    if (this.state === 'unstated') {
      this.state = 'stated';
    } else if (this.state === 'stated') {
      this.state = 'passed';
    }
  }

  copyFrom (object: any) {
    this.message = object.message;
    this.duration = object.duration;
    this.faceId = object.faceId;
  }
}
