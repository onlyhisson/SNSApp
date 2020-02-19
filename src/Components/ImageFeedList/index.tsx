import React from 'react';
import {
    FlatList,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';

import Styled from 'styled-components/native';

const ImageContainer = Styled.TouchableOpacity`
    background: #FEFFFF;
    padding: 1px;
`;

interface Props {
    id?: number;
    bounces?: boolean;
    scrollEnabled?: boolean;
    feedList: Array<IFeed>;
    loading?: boolean;
    onRefresh?: () => void;
    onEndReached?: () => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onPress?: () => void;
};

const ImageFeedList = ({
    id,
    bounces = true,
    scrollEnabled = true,
    feedList,
    loading,
    onRefresh,
    onEndReached,
    onScroll,
    onPress
}: Props) => {
    const width = Dimensions.get('window').width;
    const imageWidth = width / 3;   // 이미지를 3열로 출력하기 위해 너비값 get

    return (
        
        <FlatList   
            // 데이터의 길이가 가변적이고 데이터의 양을 예측할 수 없을 경우에 사용하기 적절한 컴포넌트 
            // 초기 렌더링시 성능 향상의 장점이 있다
            data={feedList}
            style={{ width }}
            keyExtractor={(item, index) => {        // 각 요소 구분
                return `image-feed-${id}-${index}`;
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}           
            bounces={bounces}   // scroll view가 content의 끝에 도달시 튕김 여부
            numColumns={3}      // To render multiple columns
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            onScroll={onScroll}
            scrollEventThrottle={400}   // 스크롤하는 동안 스크롤 이벤트가 실행되는 빈도(ms 단위 시간 간격), onScroll 시 제어값, iOS
            renderItem={({ item, index }) => (
                <ImageContainer 
                    style={{    // 이미지 테두리 설정
                        paddingLeft: index % 3 === 0 ? 0 : 1,
                        paddingRight: index % 3 === 2 ? 0 : 1,
                    }}
                    onPress={onPress}>
                        <Image source={{ uri: item.images[0] }} style={{ width: imageWidth, height: imageWidth}} />
                </ImageContainer>
            )}
        />
    );
};

export default ImageFeedList;