import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  href: string;
  classContainer: string;
  title: string;
};

const BackButton: React.FC<ButtonProps> = ({ href, classContainer, title }) => {
  return (
    <Link to={href} className={classContainer}>
      {title}
    </Link>
  );
};

export default BackButton;
