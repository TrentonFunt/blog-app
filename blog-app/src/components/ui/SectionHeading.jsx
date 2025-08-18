import PropTypes from 'prop-types';

export default function SectionHeading({ children, className = '' }) {
  return (
    <h2 className={`text-3xl font-bold text-primary mb-6 ${className}`}>
      {children}
    </h2>
  );
}

SectionHeading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
