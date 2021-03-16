import React from 'react';

import { BadgeWrapper } from './badge.style';

type Props = {
  badge: Number
};

const Badge = ({ badge }: Props) => <BadgeWrapper className="badgeWrapper">{badge}</BadgeWrapper>;

export default Badge;
