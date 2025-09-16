import { Tooltip } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function IconButtonWithTooltip({ icon: IconComponent, label, className = '', ...props }) {
  return (
    <Tooltip>
      <Tooltip.Trigger as="span">
        <button className={`btn btn-circle btn-sm ${className}`} {...props}>
          {IconComponent && <IconComponent className="w-5 h-5" />}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Panel className="bg-base-100 text-base-content rounded shadow p-2 text-xs">
        {label}
      </Tooltip.Panel>
    </Tooltip>
  );
}

IconButtonWithTooltip.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
