import React, { useState, useContext, useEffect } from 'react';
import { 
    NativeScrollEvent,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    ScrollView,
    ImageSourcePropType,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Styled from 'styled-components/native';

import { RandomUserDataContext } from '~/Context/RandomUserData';

import IconButton from '~/Components/IconButton';
import Tab from '~/Components/Tab';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';

const ProfileTabContainer = Styled.View`
    flex-direction: row;
    background-color: #FEFFFF;
`;

const FeedContainer = Styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const ImageContainer = Styled.TouchableHighlight`
    background: #FEFFFF;
    padding: 1px;
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
};

const Profile = ({ navigation }: Props) => {
    const { getMyFeed } = useContext(RandomUserDataContext);
    const [feedList, setFeedList] = useState<Array<IFeed>>([]);
    const imageWidth = Dimensions.get('window').width / 3;
    const tabs = [
        require('~/Assets/Images/ic_grid_image_focus.png'),
        require('~/Assets/Images/ic_tag_image.png'),
    ];

    useEffect(() => {
        setFeedList(getMyFeed(24));
    }, []);

    const isBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: NativeScrollEvent) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    };

    return (
        // FlatList 와 다르게 onEndReached를 Props로 가지고 있지 않아 
        // 스크롤하여 제일 하단으로 이동시 무한 스크롤 구현을 따로 한다.
        <ScrollView
            stickyHeaderIndices={[2]}   // index에 해당하는 아이템이 상단 부분에 도착했을 때 고정된다.
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => { // 무한 스크롤을 따로 구현
                if(isBottom(event.nativeEvent)) {
                    setFeedList([...feedList, ...getMyFeed(24)])
                }
            }}>
            <ProfileHeader 
                image="http://api.randomuser.me/portraits/women/68.jpg"
                posts={3431}
                follower={6530}
                following={217}
            />
            <ProfileBody 
                name="Sara Lambert"
                description="On Friday, April 14, being Good-Friday, I repaired to him in the\nmorning, according to my usual custom on that day,"
            />
            <ProfileTabContainer>
                {tabs.map((image: ImageSourcePropType, index: number) => (
                    <Tab key={`tab-${index}`} selected={index === 0} imageSource={image} />
                ))}
            </ProfileTabContainer>
            <FeedContainer>
                {feedList.map((feed: IFeed, index: number) => (
                    <ImageContainer
                        key={`feed-list-${index}`}
                        style={{
                            paddingLeft: index % 3 === 0 ? 0 : 1,
                            paddingRight: index % 3 === 2 ? 0 : 1,
                            width: imageWidth,
                        }}>
                        <Image source={{ uri: feed.images[0] }} style={{ width: imageWidth, height: imageWidth}} />
                    </ImageContainer>
                ))}
            </FeedContainer>
        </ScrollView>
    );
};

interface INaviProps {
    navigation: NavigationScreenProp<NavigationState>;
};


Profile.navigationOptions = ({ navigation }: INaviProps) => {
    return {
        title: 'Profile',
        headerRight: <IconButton iconName="menu" onPress={navigation.openDrawer} /> // 헤더 오른쪽에 메뉴 버튼 추가, 드로어 메뉴 표시
    };
};

export default Profile;