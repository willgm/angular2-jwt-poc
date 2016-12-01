import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

let subject: LocalStorageService;

describe('Service: LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    subject = TestBed.get(LocalStorageService);
  });

  it('localStorage should be clear', () => {
    expect(localStorage.length).toBe(0);
  });

  describe('when setting item with simple values', () => {

    it('should set a number at localStorage', () => {
      subject.set('key', 666);
      expect(localStorage.getItem('key')).toBe('666');
    });

    it('should set a string at localStorage', () => {
      subject.set('key', 'you');
      expect(localStorage.getItem('key')).toBe('you');
    });

    it('should set an object at localStorage', () => {
      subject.set('key', {a: 1});
      expect(localStorage.getItem('key')).toBe('{"a":1}');
    });

  });

  describe('when setting item with objects', () => {

    it('should set a number at localStorage', () => {
      subject.set({key: 666});
      expect(localStorage.getItem('key')).toBe('666');
    });

    it('should set a string at localStorage', () => {
      subject.set({key: 'you'});
      expect(localStorage.getItem('key')).toBe('you');
    });

    it('should set an object at localStorage', () => {
      subject.set({key: {a: 1}});
      expect(localStorage.getItem('key')).toBe('{"a":1}');
    });

    it('should set more then one item at localStorage', () => {
      subject.set({a: 11, b: 22});
      expect(subject.get('a')).toBe('11');
      expect(subject.get('b')).toBe('22');
    });

  });

  it('should get an item from localStorage', () => {
    localStorage.setItem('key', '666');
    expect(subject.get('key')).toBe('666');
  });

  it('should get an object from localStorage', () => {
    localStorage.setItem('key', '{"a": 1}');
    expect(subject.getObject('key')).toEqual({a: 1});
  });

  it('should clear an item from localStorage', () => {
    localStorage.setItem('key', '666');
    subject.clear('key');
    expect(subject.get('key')).toBe(null);
  });

  it('should clear more than one item from localStorage in one call', () => {
    localStorage.setItem('key1', '666');
    localStorage.setItem('key2', '666');
    subject.clear('key1', 'key2');
    expect(subject.get('key1')).toBe(null);
    expect(subject.get('key2')).toBe(null);
  });

  it('should get an object from localStorage', () => {
    localStorage.setItem('key', '666');
    subject.clear();
    expect(subject.get('key')).toBe(null);
  });

});
