import React from 'react';
import Field from '@vant/weapp/lib/field';
import Icon from '@vant/weapp/lib/icon';
import Button from '@vant/weapp/lib/button';
import { SOCIAL_LOGOS } from '../../constants';
import { View } from 'remax/wechat';

/**
 * @typedef {import("../..").Record<import("../..").SocialType>} SocialRecord
 * @param {{
 * socialItem: SocialRecord;
 * onDelete: (socialItem: SocialRecord) => void;
 * }} props
 */
export default function ({ socialItem, onDelete }) {
  const icon = SOCIAL_LOGOS[socialItem.get('id')];
  return (
    <Field
      readonly={true}
      left-icon={icon}
      label={socialItem.get('name')}
      value={socialItem.get('account')}
    >
      {onDelete && (
        <View slot="button">
          <Button
            icon="delete"
            type="danger"
            plain
            hairline
            size="mini"
            bindclick={() => onDelete(socialItem)}
          />
        </View>
      )}
    </Field>
  );
}
