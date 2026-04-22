import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];

  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

vi.mock('@creit.tech/stellar-wallets-kit', () => ({
  StellarWalletsKit: class MockStellarWalletsKit {
    openModal = vi.fn();
    setWallet = vi.fn();
    getAddress = vi.fn();
    signTransaction = vi.fn();
  },
  WalletNetwork: {
    TESTNET: 'TESTNET',
    PUBLIC: 'PUBLIC',
  },
  FREIGHTER_ID: 'freighter',
  FreighterModule: class MockFreighterModule {},
  AlbedoModule: class MockAlbedoModule {},
  xBullModule: class MockXBullModule {},
}));
