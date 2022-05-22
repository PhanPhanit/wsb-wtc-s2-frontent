import {
    SET_SLIDE,
    CREATE_SLIDE,
    DELETE_SLIDE,
    SET_UPDATE_SLIDE_ID,
    UPDATE_SLIDE
} from "../action";

const dash_slide_reducer = (state, action) => {
    if(action.type===SET_SLIDE){
        return {
            ...state,
            slides: action.payload
        }
    }
    if(action.type===CREATE_SLIDE){
        return {
            ...state,
            slides: [action.payload, ...state.slides]
        }
    }
    if(action.type===DELETE_SLIDE){
        const slideId = action.payload;
        const tempSlides = state.slides.filter(item=>item._id!==slideId);
        return {
            ...state,
            slides: tempSlides
        }
    }
    if(action.type===SET_UPDATE_SLIDE_ID){
        return {...state, updateSlideId: action.payload};
    }
    if(action.type===UPDATE_SLIDE){
        const {slide, slideId} = action.payload;
        const updateSlide = state.slides.map(item=>{
            if(item._id===slideId){
                return slide;
            }
            return item;
        });
        return {...state, slides: updateSlide};
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default dash_slide_reducer;