import React from 'react';
import styles from './AvailabilityOptions.module.css';
import { ServerError, AnimBox, AvailabilityChip } from 'components';

const AvailabilityOptions = ({ input: { value, onChange }, meta: { touched, error } }) => (
  <div>
    <ServerError error={touched && error} />
    <div className={styles['availability-options']}>
      {value === 'working'
        ? (
          <div className={styles['availability-chip']}>
            <AvailabilityChip availability="working" current="working" />
          </div>
        ) : ['available_now', 'available_soon', 'not_available'].map((availability, index) => (
          <AnimBox grow delay={index * 200} key={availability}>
            <div className={styles['availability-chip']}>
              <AvailabilityChip
                availability={availability}
                current={value}
                onClick={onChange}
                data-cy={`availability-${availability}`}
                key={availability}
              />
            </div>
          </AnimBox>
        ))
      }
    </div>
  </div>
);
export default AvailabilityOptions;
