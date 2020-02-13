import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationScreenProps } from 'react-navigation';

import { RandomUserDataProvider, RandomUserDataContext } from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import StoryList from './StoryList';

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const MyFeed = ({ navigation }: Props) => {
    const { getMyFeed } = useContext(RandomUserDataContext);
    const [feedList, setFeedList] = useState<Array<IFeed>>([]);
    const [storyList, setStoryList] = useState<Array<IFeed>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setFeedList(getMyFeed());
        setStoryList(getMyFeed());
    }, []); // componentDidMount

    return (
        <FlatList 
            data={feedList} 
            keyExtractor={(item, index) => { return `myfeed-${index}` }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {  // 당겨서 새로 고침
                setLoading(true);
                setTimeout(() => {  // 헤더의 스토리 리스트와 피드 리스트를 다시 가져와 화면 갱신
                    setFeedList(getMyFeed());
                    setStoryList(getMyFeed());
                    setLoading(false);
                }, 2000);
            }}
            onEndReached={() => {   // 스크롤이 최하단으로 이동시 이벤트
                setFeedList([...feedList, ...getMyFeed()]);
            }}
            onEndReachedThreshold={0.5} // 0.5 : when the end of the content is within half the visible length of the list.
            refreshing={loading}
            ListHeaderComponent={<StoryList storyList={storyList} />}
            renderItem={({ item, index }) => (
                <Feed id={index} name={item.name} photo={item.photo} description={item.description} images={item.images} />
            )}
        />
    );
};

MyFeed.navigationOptions = {
    title: 'SNS App',
    headerLeft: <IconButton iconName="camera" />,
    headerRight: (
        <>
            <IconButton iconName="live" />
            <IconButton iconName="send" />
        </>
    )
}

export default MyFeed;