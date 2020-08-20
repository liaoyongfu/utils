import { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { stringify } from 'qs';
import { useDeepCompareEffect, useFirstMountState } from 'react-use';
import { useQuery } from '../index';

export interface Page {
    totalPage: number;
    currentPage: number;
    linesPerPage: number;
    totalNum: number;
}

export interface Data {
    list: [];
    page: Page;
}

export interface ListProps {
    data: any;
    initialReqData: object | undefined;
    queryToForm: object;
    formToQuery: object;
    reqData: object;
    isUpdateToQuery: boolean;
}

// 更新查询条件
const updateQuery = (obj: object, history: any, location: any) => {
    const query = useQuery();
    history.replace({
        pathname: location.pathname,
        search: stringify({
            ...query,
            ...obj
        })
    });
};

/**
 * 快速查询列表
 * 原理：
 * 第一次渲染：获取 initialQuery 更新到 form；并触发查询
 * 触发查询：获取表单的值更新到 query
 */
const useList = ({ data, initialReqData, formToQuery, reqData, isUpdateToQuery = false }: ListProps) => {
    // const query = useQuery();
    const history = useHistory();
    const location = useLocation();
    const [list, setList] = useState([]);
    const isFirstMount = useFirstMountState();
    const [page, setPage] = useState<Page>({
        totalNum: 0,
        totalPage: 0,
        linesPerPage: 10,
        currentPage: 1
    });

    const fetchList = useCallback(async (params) => {
        const response = await data(params);
        setList(response.list);
        setPage(response.page);
        // update to query
        if (isUpdateToQuery) {
            updateQuery(formToQuery, history, location);
        }
    }, []);

    // 刷新
    const refreshList = async () => {
        // 更新 query 到 form 中
        await fetchList(reqData);
    };

    // 重置
    const resetList = async () => {
        // 清空 query，去掉 form 中有的字段
        await fetchList(initialReqData);
    };

    // 如果有 initialReqData，则第一次时用 initialReqData 查询
    useDeepCompareEffect(() => {
        if (initialReqData && isFirstMount) {
            fetchList(initialReqData);
        }
    }, [fetchList]);

    // 如果没有初始值，则第一次就拿 reqData 查询
    // 如果有初始值，非第一次时进行渐染
    useDeepCompareEffect(() => {
        if (isFirstMount && !initialReqData) {
            fetchList(reqData);
        }
    }, [data, reqData, fetchList]);

    return {
        list,
        page,
        resetList,
        refreshList
    };
};

export default useList;
