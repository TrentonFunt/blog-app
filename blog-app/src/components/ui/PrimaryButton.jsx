import PropTypes from 'prop-types';

export default function PrimaryButton({ children, variant = 'solid', className = '', ...props }) {
  const base = 'btn btn-primary font-semibold transition-all duration-200';
  const outline = 'btn btn-outline btn-primary';
  const style = variant === 'outline' ? outline : base;

  return (
    <button className={`${style} rounded-lg shadow-sm hover:scale-105 ${className}`} {...props}>
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['solid', 'outline']),
  className: PropTypes.string,
};
