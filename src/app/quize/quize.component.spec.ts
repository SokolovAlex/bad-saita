import { TestBed } from '@angular/core/testing';

import { QuizeComponent } from './quize.component';

describe('About Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [QuizeComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(QuizeComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
  });

});
