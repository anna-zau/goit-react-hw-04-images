import PropTypes from 'prop-types';

import { ButtonTag } from './Button.styled';

export const Button = ({ onBtnClick, loading }) => {
  return (
    <ButtonTag type="button" disabled={loading} onClick={() => onBtnClick()}>
      Load more
    </ButtonTag>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
