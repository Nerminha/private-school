import { MyFiltrePipe } from './my-filtre.pipe';

describe('MyFiltrePipe', () => {
  it('create an instance', () => {
    const pipe = new MyFiltrePipe();
    expect(pipe).toBeTruthy();
  });
});
