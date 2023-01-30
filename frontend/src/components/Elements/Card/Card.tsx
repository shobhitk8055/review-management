import clsx from 'clsx';
import * as React from 'react';

export type CardProps = {
  heading?: string;
  header?: string;
  footer?: string;
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ header, heading, footer, shadow = false, children, className = '' }, ref) => {
    return (
      <div className={clsx('card rounded-lg', shadow ? 'shadow border-0' : '', className)}>
        {header && (
          <div className="card-header p-4">
            <b className="ps-3">{header}</b>
          </div>
        )}
        <div className="card-body">
          {heading && (
            <h4>
              <b>{heading}</b>
            </h4>
          )}
          {children}
        </div>
        {footer && <div className="card-header">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
