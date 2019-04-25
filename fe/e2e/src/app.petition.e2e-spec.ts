import { PetitionPage } from './app.po';
import { by, element } from 'protractor';

describe('workspace-project Petition', () => {
  let page: PetitionPage;

  beforeEach(() => {
    page = new PetitionPage();
  });

  // it('should display the header', () => {
  //   page.navigateTo();
  //   expect(element(by.id('form-header')).getText()).toEqual('Add Petition');
  // });

  // it('should display the label - defender', () => {
  //   page.navigateTo();
  //   expect(element(by.id('lbl-defender')).getText()).toEqual('Defender:');
  // });

  // it('should display the input for defender', () => {
  //   page.navigateTo();
  //   expect(element(by.id('input.defender')).isPresent).toBeTruthy();
  // });

  // it('should display the label - charge', () => {
  //   page.navigateTo();
  //   expect(element(by.id('lbl-charge')).getText()).toEqual('Charge:');
  // });

  // it('should display the input for Charge', () => {
  //   page.navigateTo();
  //   expect(element(by.id('input-charge')).isPresent).toBeTruthy();
  // });

  // it('should display the label - punishment', () => {
  //   page.navigateTo();
  //   expect(element(by.id('lbl-punishment')).getText()).toEqual('Punishment:');
  // });

  // it('should display the input for punishment', () => {
  //   page.navigateTo();
  //   expect(element(by.id('input.punishment')).isPresent).toBeTruthy();
  // });

  // it('should display the submit button', () => {
  //   page.navigateTo();
  //   expect(element(by.id('btn-submit')).isPresent).toBeTruthy();
  // });

});
