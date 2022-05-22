import React from 'react'
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import '../styles/pagination.css';
import {useProductContext} from '../context/product_context';


const PaginationReact = () => {
    const {
        all_favorit_book: {
            total_page,
            current_page
        },
        setNewArrivalPage
    } = useProductContext();
    const getPage = (event, value) => {
        setNewArrivalPage(value)
    }
    return (
        <div className="wrapper-global pagination-wrapper">
            <Stack spacing={2}>
                <Pagination
                    count={total_page}
                    page={current_page}
                    onChange={getPage}
                    renderItem={(item) => (
                        <PaginationItem
                          components={{
                              previous: GrLinkPrevious,
                              next: GrLinkNext,
                            }}
                          {...item}
                        />
                    )}
                />
            </Stack>
        </div>
    )
}


export default PaginationReact
