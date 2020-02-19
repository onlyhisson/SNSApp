import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Image,
} from 'react-native';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';

const Container = Styled.View``;

const ImageContainer = Styled.View`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #D3D3D3;
    width: ${Dimensions.get('window').width}px;
    height: 400px;
`;

const FeedImageIndicatorContainer = Styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-itemes: center;
`;

const FeedImageIndicator = Styled.View`
    width: 8px;
    height: 8px;
    border-radius: 8px;
    margin: 2px;
`;

const FeedMenuContainer = Styled.View`
    flex-direction: row;
`;

const MenuContainer = Styled.View`
    flex: 1;
    flex-direction: row;
`;

interface Props {
    id: number;
    images: Array<String>;
};

const FeedBody = ({ id, images }: Props) => {
    const [indicatorIndex, setIndicatorIndex] = useState<number>(0);    // 이미지 리스트의 현재 위치를 표시
    const imageLength = images.length;

    return (
        <Container>
            <ScrollView 
                horizontal={true}       // When true, the scroll view's children are arranged horizontally in a row
                pagingEnabled={true}    // 스크롤할 때 스크롤 뷰 크기의 배수에서 정지한다
                showsHorizontalScrollIndicator={false}
                scrollEnabled={imageLength > 1} // 이미지 한개 이상일 경우 스크롤 가능
                onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => { // 스크롤 이벤트 발생시
                    setIndicatorIndex(event.nativeEvent.contentOffset.x / Dimensions.get('window').width); // x축 위치 / 전체 가로 사이즈
            }}>
                {images.map((image, index) => (
                    <ImageContainer key={`FeedImage-${id}-${index}`}>
                        <Image source={{ uri: image as string }} style={{ width: Dimensions.get('window').width, height: 400 }} />

                    </ImageContainer>
                ))}
            </ScrollView>
            <FeedMenuContainer>
                <MenuContainer>
                    <IconButton iconName="favorite" />
                    <IconButton iconName="comment" />
                    <IconButton iconName="send" />
                </MenuContainer>
                <MenuContainer>
                    <FeedImageIndicatorContainer>
                        {imageLength > 1 && images.map((image, index) => (
                            <FeedImageIndicator 
                                key={`FeedImageIndicator-${id}-${index}`}
                                style={{
                                    backgroundColor: indicatorIndex >= index && indicatorIndex < index + 1 ? '#3796EF' : '#D3D3D3',
                                }}
                            />
                        ))}
                    </FeedImageIndicatorContainer>
                </MenuContainer>
                <MenuContainer style={{ justifyContent: 'flex-end' }}>
                    <IconButton iconName="bookmark" />
                </MenuContainer>
            </FeedMenuContainer>
        </Container>
    );
};

export default FeedBody;
