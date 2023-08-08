import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadCompanies, setCompanies, setCurrentPage} from './redux/actions';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

function App() {
    const companies = useSelector(state => state.companies);
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await dispatch(loadCompanies(currentPage));
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [currentPage, dispatch]);
    console.log(companies)

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(companies);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        dispatch(setCompanies(items));
    };

    return (
        <div className="App">
            <h1 className="my-4">Список компаний</h1>
            {isLoading ? (
                <div className="text-center mb-3">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="companies">
                            {(provided) => (
                                <table className="table table-striped" ref={provided.innerRef} {...provided.droppableProps}>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Symbol</th>
                                        <th>Name company</th>
                                        <th>Last update</th>
                                        <th>Close price</th>
                                        <th>Primary exchange</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {companies.map((company, index) => (
                                        <Draggable key={company.id} draggableId={company.id.toString()} index={index}>
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <td>{company.id}</td>
                                                    <td>{company.symbol}</td>
                                                    <td>{company.companyName}</td>
                                                    <td>{format(new Date(company.latestUpdate), 'dd MMMM yyyy', { locale: enUS })}</td>
                                                    <td>{company.close}</td>
                                                    <td>{company.primaryExchange}</td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </tbody>
                                </table>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
            <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                    disabled={currentPage === 1 || isLoading}
                >
                    Предыдущая
                </button>
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    disabled={isLoading}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
}

export default App;
