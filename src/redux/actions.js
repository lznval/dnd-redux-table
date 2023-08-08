import axios from 'axios';
const API_KEY = 'pk_c73a50f72d3e4c03836687340c38c181';
const perPage = 10
export const loadCompanies = (currentPage) => async (dispatch) => {
    try {
        const response = await axios.get(`https://cloud.iexapis.com/stable/stock/market/collection/sector`, {
            params: {
                collectionName: 'Technology',
                token: API_KEY,
                limit: perPage * currentPage
            }
        });
        const companiesWithId = response.data.map((company, index) => ({
            id: index + 1,
            ...company,
        }));

        const slicedCompanies = companiesWithId.slice((currentPage - 1) * perPage, currentPage * perPage);

        dispatch({
            type: 'LOAD_COMPANIES',
            payload: slicedCompanies
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};

export const setCompanies = (companies) => {
    return {
        type: 'SET_COMPANIES',
        payload: companies
    };
};

export const setCurrentPage = (page) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: page
    };
};
