import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
} from './welcome.style';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { t } = useTranslation();
  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/radarin.png" alt="Inrupt" />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t('welcome.welcome')}
          </h3>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="welcome.description">
            <p>
              text
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link{' '}
              </a>{' '}
              text
            </p>
          </Trans>
          
          <h3>{t('welcome.fairUsageTitle')}</h3>
          <p>{t('welcome.fairUsageText')}</p>
          
          <h3>{t('welcome.contactUsTitle')}</h3>
          <Trans i18nKey="welcome.contactUsText">
            <p>
              If you have additional questions about the use of the React SDK for Solid, the
              Application Generator, or inrupt’s brand, please contact
              <a href="mailto:support@inrupt.com">support@inrupt.com</a>.
            </p>
          </Trans>
        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
