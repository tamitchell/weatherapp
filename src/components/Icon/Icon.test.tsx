import { render, screen } from "@testing-library/react";
import Icon from "./Icon";
import { iconMap } from "src/data/iconMap";

jest.mock('../../data/iconMap', () => ({
    iconMap: {
        settings: jest.fn((props) => <svg {...props} data-testid={props['data-testid'] || 'icon-settings'} />),
        visibility: jest.fn((props) => <svg {...props} data-testid={props['data-testid'] || 'icon-visibility'} />),
      },
      IconName: {
        settings: 'settings',
        visibility: 'visibility',
      }
  }));
  
  describe('Icon', () => {
    it('renders the correct icon', () => {
        render(<Icon name="settings" />);
        expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
        expect(iconMap.settings).toHaveBeenCalled();
      });
  
    it('applies default size', () => {
        render(<Icon name="visibility" />);
        expect(screen.getByTestId('icon-visibility')).toBeInTheDocument();
        expect(iconMap.visibility).toHaveBeenCalledWith(
          expect.objectContaining({
            width: 24,
            height: 24,
          }),
          expect.anything()
        );
    });
  
    it('applies custom size', () => {
        render(<Icon name="settings" size={32} />);
        expect(iconMap.settings).toHaveBeenCalledWith(
          expect.objectContaining({
            width: 32,
            height: 32,
          }),
          expect.anything()
        );
    });
  
    it('applies default fill color', () => {
        render(<Icon name="visibility" />);
        expect(iconMap.visibility).toHaveBeenCalledWith(
          expect.objectContaining({
            fill: 'black',
          }),
          expect.anything()
        );
    });
  
    it('applies custom fill color', () => {
        render(<Icon name="settings" fill="red" />);
        expect(iconMap.settings).toHaveBeenCalledWith(
          expect.objectContaining({
            fill: 'red',
          }),
          expect.anything()
        );
    });
  
    it('applies stroke color when provided', () => {
        render(<Icon name="visibility" stroke="blue" />);
        expect(iconMap.visibility).toHaveBeenCalledWith(
          expect.objectContaining({
            stroke: 'blue',
          }),
          expect.anything()
        );
    });
  
    it('passes through additional props', () => {
        render(<Icon name="settings" data-testid="custom-settings-testid" />);
        expect(screen.getByTestId('custom-settings-testid')).toBeInTheDocument();
        expect(iconMap.settings).toHaveBeenCalledWith(
          expect.objectContaining({
            'data-testid': 'custom-settings-testid',
          }),
          expect.anything()
        );
    });
  });
  