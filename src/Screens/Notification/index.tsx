import React, { useContext, useState, useEffect, createRef } from 'react';
import {
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView
} from 'react-native';

import Styled from 'styled-components/native';

import { RandomUserDataContext } from '~/Context/RandomUserData';
import Tab from '~/Components/Tab';
import NotificationList from './NotificationList';

const ProfileTabContainer = Styled.View`
    flex-direction: row;
    background-color: #FEFFFF;
`;

const Label = Styled.Text`
    color: #929292;
    text-align: center;
`;

const TabContaniner = Styled.SafeAreaView`
    width: 100%;
    height: ${Dimensions.get('window').height}px;
`;

interface Props {}

const Notification = ({ }: Props) => {
    const { getMyFeed } = useContext(RandomUserDataContext);
    const [followingList, setFollowingList] = useState<Array<IFeed>>([]);
    const [myNotifications, setMyNotifications] = useState<Array<IFeed>>([]);
    const [tabIndex, setTableIndex] = useState<number>(1);
    const width = Dimensions.get('window').width;
    const tabs = ['팔로잉', '내 소식'];

    // https://ko.reactjs.org/docs/refs-and-the-dom.html
    // 직접적으로 자식노드를 수정할 경우, 부모컴포넌트의 props를 받을 구조가 아닐 경우 사용
    const refScrollView = createRef<ScrollView>();  

    useEffect(() => {
        setFollowingList(getMyFeed(24));
        setMyNotifications(getMyFeed(24));
    }, []); // 두번째인자가 빈 배열이면 componentDidMount

    return (
        <TabContaniner>
            <ProfileTabContainer>
                {tabs.map((label: string, index: number) => (
                    <Tab 
                        key={`tab-${index}`}
                        selected={tabIndex === index}
                        label={label}
                        onPress={() => {
                            setTableIndex(index);
                            const node = refScrollView.current; // render 메소드 안에서 참조 사용 방법 .current
                            if(node) {
                                node.scrollTo({ x: width * index, y: 0, animated: true });
                            }
                        }}
                    />
                ))}
            </ProfileTabContainer>
            <ScrollView 
                ref={refScrollView} // 생성자에서 생성한 ScrollView ref와 연결
                horizontal={true}   // stickyHeaderIndices 와 함께 지원 안된다는데??
                showsHorizontalScrollIndicator={false}  
                pagingEnabled={true}
                stickyHeaderIndices={[0]}   // 스크롤 상단에 고정할 하위 컴포넌트 인덱스, horizontal={true} 와 함께 지원되지 않는다.
                onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                    const index = event.nativeEvent.contentOffset.x / width;
                    setTableIndex(index);
                }}
                contentOffset={{ x:width, y: 0}}>
                <NotificationList
                    id={0}
                    width={width}
                    data={followingList}
                    onEndReached={() => {
                        setFollowingList([...followingList, ...getMyFeed(24)]);
                    }}
                 />
                <NotificationList 
                    id={1}
                    width={width}
                    data={myNotifications}
                    onEndReached={() => {
                        setMyNotifications([...myNotifications, ...getMyFeed(24)]);
                    }}
                />
            </ScrollView>
        </TabContaniner>
    );
};

export default Notification;