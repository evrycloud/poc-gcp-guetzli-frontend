import fetch from 'isomorphic-fetch';
import { dispatch } from 'redux';

import { SUMMARY_REQUESTED, SUMMARY_SUCCEEDED, SUMMARY_FAILED } from './actions';

const defaultState = {
    error: null,
    fetching: false,
    initial: true,
    data: {
        title: 'ECS: Performance POC',
        entries: []
    },
};

export default function summary(state = defaultState, action) {
    switch (action.type) {
        case SUMMARY_REQUESTED:
            return {
                ...state,
                fetching: true,
            };
        case SUMMARY_SUCCEEDED:
            const data = action.data;

            return {
                ...state,
                fetching: false,
                initial: false,
                data,
            };
        case SUMMARY_FAILED:
            return {
                ...state,
                error: action.error,
                fetching: false,
            };
        default:
            break;
    }

    return state;
}

export function fetchSummary(dispatch) {
    dispatch({
        type: SUMMARY_REQUESTED,
    });

    return fetch(`http://localhost:3000/v1/summary`)
    .then(res => res.json())
    .then(data => dispatch({
        type: SUMMARY_SUCCEEDED,
        data,
    }))
    .catch(error => dispatch({
        type: SUMMARY_FAILED,
        error,
    }));
}
