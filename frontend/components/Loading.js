import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Modal} from 'react-native';
import {StyleSheet} from 'react-native';

const Loading = ({loading}) => (
  <Modal transparent={true} animationType={'fade'} visible={loading}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator color="#000" animating={loading} />
      </View>
    </View>
  </Modal>
);

Loading.propTypes = {
  loading: PropTypes.bool,
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    height: '100%',
    width: '100%',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#808080',
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;