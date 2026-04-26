import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

describe('Modal Component', () => {
  it('renders modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render modal content when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).toBeNull();
    expect(screen.queryByTestId('modal-content')).toBeNull();
  });

  it('calls onClose when close button (X) is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking backdrop', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within modal', async () => {
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={() => {}} title="Focus Test">
        <input aria-label="Name" />
        <button>OK</button>
      </Modal>
    );

    const textbox = screen.getByRole('textbox', { name: 'Name' });
    const button = screen.getByRole('button', { name: 'OK' });

    expect(textbox).toHaveFocus();

    await user.tab();
    expect(button).toHaveFocus();

    await user.tab();
    expect(textbox).toHaveFocus();

    await user.tab({ shift: true });
    expect(button).toHaveFocus();
  });

  it('prevents body scroll when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Body lock test">
        <div>Modal Content</div>
      </Modal>
    );

    expect(document.body).toHaveStyle('overflow: hidden');
  });

  it('restores focus to trigger element on close', () => {
    const TriggerHarness = ({ isOpen }: { isOpen: boolean }) => (
      <>
        <button>Open modal</button>
        <Modal isOpen={isOpen} onClose={() => {}} title="Focus Restore">
          <button>Confirm</button>
        </Modal>
      </>
    );

    const { rerender } = render(<TriggerHarness isOpen={false} />);
    const trigger = screen.getByRole('button', { name: 'Open modal' });
    trigger.focus();
    expect(trigger).toHaveFocus();

    rerender(<TriggerHarness isOpen={true} />);
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus();

    rerender(<TriggerHarness isOpen={false} />);
    expect(trigger).toHaveFocus();
  });

  it('has correct ARIA attributes and supports labels/description ids', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        ariaDescribedBy="modal-description"
      >
        <p id="modal-description">Content</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const heading = screen.getByRole('heading', { name: 'Test Modal' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal" closeOnBackdropClick={false}>
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders without a title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).toBeNull();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
});
