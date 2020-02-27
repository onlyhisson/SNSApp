import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = Styled.View`
    flex: 1;
    background-color: #FEFFFF;
    align-items: center;
    justify-content: center;
`;

interface Props {
    cache?: boolean;
    children: JSX.Element | Array<JSX.Element>;
}

interface IRandomUserData { 
    getMyFeed: (number?: number) => Array<IFeed>;
}

const RandomUserDataContext = createContext<IRandomUserData> ({
    getMyFeed: (number: number = 10) => {
        return [];
    }
});

const RandomUserDataProvider = ({ cache, children }: Props) => {
    const [userList, setUserList] = useState<Array<IUserProfile>>([]);          // 사용자 리스트
    const [descriptionList, setDescriptionList] = useState<Array<string>>([]);  // 이미지 설명 리스트
    const [imageList, setImageList] = useState<Array<string>>([]);              // 사용자의 이미지 리스트

    // 캐쉬 설정에 따라 모바일 내부에 저장된 데이터 리턴
    const getCacheData = async (key: string) => {
        const cacheData = await AsyncStorage.getItem(key);

        if(cache === false || cacheData === null) {
            return undefined;
        }
        const cacheList = JSON.parse(cacheData);

        if(cacheList.length !== 25) {
            return undefined;
        }

        return cacheList;
    };

    // 모바일 내부에 data 값 key:value 저장
    const setCachedData = (key: string, data: Array<any>) => {
        AsyncStorage.setItem(key, JSON.stringify(data));
    };

    // 모바일 내부에 저장된 데이터를 useState 에 저장
    const setUsers = async () => {
        const cachedData = await getCacheData('UserList');  // 설정에 따로 모바일 내부 데이터 get
        if(cachedData) {
            setUserList(cachedData);    // useState 에 저장
            return;
        }

        try {
            const response = await fetch('https://uinames.com/api/?amount=25&ext');
            const data = await response.json();
            setUserList(data);                  // useState 에 저장
            setCachedData('UserList', data);    // 모바일 내부에 저장
        } catch (error) {
            console.log('================= setUsers function start =================');
            console.log(error);
            console.log('================= setUsers function end   =================');
        }
    };

    // 모바일 내부에 이미지에 대한 내용 데이터 조회 후 useState 에 저장
    const setDescriptions = async () => {
        const cachedData = await getCacheData('DescriptionList'); // 모바일 내부에 이미지에 대한 내용 데이터 조회
        
        if (cachedData) {
            setDescriptionList(cachedData); // useState 에 저장
            return;
        }

        try {
            const response = await fetch('https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=t&n=25');
            const data = await response.json();

            let text = [];
            for (const index in data.quotes) {
                text.push(data.quotes[index].quote);
            }
            setDescriptionList(text);               // useState 에 저장
            setCachedData('DescriptionList', text); // 모바일 내부에 저장
        } catch(error) {
            console.log('================= setDescriptions function start =================');
            console.log(error);
            console.log('================= setDescriptions function end   =================');
        }
    };

    // 모바일 내부 이미지 데이터 조회 후 useState 에 저장
    const setImages = async () => {
        const cachedData = await getCacheData('ImageList'); // 모바일 내부 이미지 데이터 조회 
        if (cachedData) {
            if(Image.queryCache) {
                Image.queryCache(cachedData);
                cachedData.map((data: string) => {
                    Image.prefetch(data);
                });
            }
            setImageList(cachedData);   // useState 에 저장
            return;
        }

        setTimeout(async () => {    // 일정시간 내에 보내는 요청은 동일한 이미지가 반환되므로 타임아웃 설정
            try {
                const response = await fetch('https://source.unsplash.com/random/'); // 랜덤 이미지 조회 사이트
                const data = response.url;
                if(imageList.indexOf(data) >= 0) {  // 가져온 데이터가 이전 데이터에 이미 있을 경우 함수 재실행
                    setImages();
                    return;
                }
                setImageList([...imageList, data]);
            } catch(error) {
                console.log('================= setImages function start =================');
                console.log(error);
                console.log('================= setImages function end   =================');
            }
        }, 400);
    };

    useEffect(() => {   // componentDidMount, 컴포넌트 출력 이후 한번 실행
        setUsers();         // 모바일 내부에 저장된 데이터를 useState 에 저장, 없으면 API 데이터 호출 후 useState와 모바일에 저장
        setDescriptions();  // 모바일 내부에 저장된 데이터를 useState 에 저장, 없으면 API 데이터 호출 후 useState와 모바일에 저장
    }, []);

    useEffect(() => {   // componentDidMount, componentDidUpdate
    });

    useEffect(() => {   // componentWillUnmount, 컴포넌트가 화면에서 사라진 후
        // 라이브러리 연동해제
        // 타이머 해제
        // ...
        return () => {
            
        };
    });

    useEffect(() => {   // 전달받은 변수값 변경시 호출
        if(imageList.length !== 25) { // 이미지가 25가 될 때까지 setImages 함수 실행
            setImages();    //  모바일 내부에 이미지 데이터 있으면 useState 에저 저장, 없으면 API호출 useState와 모바일에 저장
        } else {
            setCachedData('ImageList', imageList);  // 모바일 내부에 캐시된 이미지 데이터를 useState에 저장
        }
    }, [imageList]);

    const getImages = (): Array<string> => {
        let images: Array<string> = [];
        const count = Math.floor(Math.random() * 4);    // 5개 피드

        for(let i =0; i <=count; i++) {
            images.push(imageList[Math.floor(Math.random() * 24)]); // 25개중 랜덤 5개 선택
        }

        return images;
    };

    const getMyFeed = (number: number = 10): Array<IFeed> => {  // number 값 설정하지 않으면 기본 10
        let feeds: Array<IFeed> = [];
        for(let i = 0; i < number; i++) {
            const user = userList[Math.floor(Math.random() * 24)];
            feeds.push({
                name: user.name,
                photo: user.photo,
                description: descriptionList[Math.floor(Math.random() * 24)],
                images: getImages(),
            });
        }
        return feeds;
    };
    
    console.log(
        `${userList.length} / ${descriptionList.length} / ${imageList.length}`
    );

    return (
        // ActivityIndicator, 데이터가 준비되어 있지 않은 경우
        <RandomUserDataContext.Provider value={{getMyFeed,}}>
            {
                userList.length === 25 && 
                descriptionList.length === 25 && 
                imageList.length === 25 ? (
                    children
                    ):(
                    <Loading>
                        <ActivityIndicator color="#D3D3D3" size="large"/>
                    </Loading>
                )
            }
        </RandomUserDataContext.Provider>
    );
};

export { RandomUserDataProvider, RandomUserDataContext};