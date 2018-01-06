import React, { Component } from "react";
import { Grid, Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import API from "../../../utils/api";
import Socket from "./PowerPointSocket";
import SlideList from "./SlideList";
import Preview from "./Preview";
import Note from "./Note";
import Presentation from "./Presentation";
import Pointer from "./Pointer";

const style = {
    wrapper: { padding: "1rem 1rem 0 1rem" }
}

class Slides extends Component {
    state = {
        _id: null,
        title: "",
        slides: [],
        cSlide: 0
    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);

        let id = this.props.match.params.id;
        API.PowerPoint.findOne(id)
        .then(db => this.setState({
                _id: db.data._id,
                title: db.data.title,
                slides: db.data.slides,
                cSlide: db.data.cSlide
        }, () => this.props.emitCSlide(db.data.cSlide)))
        .catch(err => console.log(err));
    };

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = ev => {
        switch(ev.which) {
            case 27: 
                return this.props.emitModal()
            case 37:
                return this.prevSlide();
            case 39: 
                return this.nextSlide();
            default:
                return null;
        }
    }

    prevSlide = () => {
        let slides = [ ...this.state.slides ];
        let allIDS = slides.map(el => el.itemId);
        let index = allIDS.indexOf(this.props.cSlide);
        if(index > 0) { 
            let prevIndex = index - 1;
            let prevSlide = allIDS[prevIndex];
            this.setState({ cSlide: prevSlide }, this.updateCSlide);
            this.props.emitCSlide(prevSlide);
        }else {
            this.props.emitModal()
        };
    } 

    
    nextSlide = () => {
        let slides = [ ...this.state.slides ];
        let allIDS = slides.map(el => el.itemId);
        let index = allIDS.indexOf(this.props.cSlide);
        if(index < slides.length - 1) {
            let nextIndex = index + 1;
            let nextSlide = allIDS[nextIndex];
            this.setState({ cSlide: nextSlide }, this.updateCSlide)
            this.props.emitCSlide(nextSlide);
        }else {
            this.props.emitModal()
        };
    } 

    addSlides = (slides) => {
        let updatedSlides = [ ...this.state.slides, ...slides ];
        this.setState({ slides: updatedSlides }, this.updatePowerPoint);
    };

    updateSlide = (slide, itemId) => {
        let slides = [ ...this.state.slides ];
        let allIDS = slides.map(el => el.itemId);
        let index = allIDS.indexOf(itemId);
        slide.note = slides[index].note;
        slides[index] = slide;
        this.props.emitCSlide(slide.itemId);
        this.setState({ slides: slides }, this.updatePowerPoint);
    }

    deleteSlide = (itemId) => {
        let slides = [ ...this.state.slides ];
        let updatedSlides = slides.filter(el => el.itemId !== itemId);
        this.setState({ slides: updatedSlides }, this.updatePowerPoint);
    };

    selectSlide  = (itemId) => {
        this.props.emitCSlide(itemId, this.updateCSlide)
    };

    addNote = ev => {
        const value = ev.target.value;
        let slides = [ ...this.state.slides ];
        let allIDS = slides.map(el => el.itemId);
        let index = allIDS.indexOf(this.props.cSlide);
        slides[index] = { ...slides[index], note: value };
        this.setState({ slides: slides });
        
    };

    updateCSlide = () => {
        API.PowerPoint.updateOne({
            _id: this.state._id,
            cSlide: this.props.cSlide
        })
        .then(db => null)
        .catch(err => console.log(err));
    };

    updatePowerPoint = cb => {
        API.PowerPoint.updateOne(this.state)
        .then(db => { 
            if(cb) cb();
        })
        .catch(err => console.log(err));
    };

    render() {

        let index = 0;
        const { slides } = this.state;
        const length = slides.length;
        const cSlide = this.props.cSlide;
        const cSlideData = slides.filter(el => el.itemId === cSlide)[0];
        if(cSlideData) {
            index = slides.map(el => el.itemId).indexOf(cSlideData.itemId);
        }

        return (
            <div>
                <Responsive minWidth={768}>
                    {cSlideData && this.props.modal ? 
                        <Presentation
                        slide={cSlideData}
                        toggleModal={this.toggleModal}/> : null}

                    <Grid style={style.wrapper}>
                        <Grid.Row columns={3}>
                            <Grid.Column width={4}>
                                <SlideList 
                                slides={slides} 
                                cSlide={cSlide}
                                addSlides={this.addSlides}
                                updateSlide={this.updateSlide}
                                deleteSlide={this.deleteSlide}
                                selectSlide={this.selectSlide}/>
                            </Grid.Column>

                            <Grid.Column width={8}>
                                {cSlideData ?    
                                    <Preview slide={cSlideData}/> 
                                : null}
                            </Grid.Column>
                    
                            <Grid.Column width={4}>
                                {cSlideData ? 
                                    <Note 
                                    addNote={this.addNote}
                                    note={cSlideData.note} 
                                    updatePowerPoint={this.updatePowerPoint}/> : null}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive maxWidth={768}>
                    <Pointer
                    itemId={cSlideData ? cSlideData.itemId : null}
                    index={index}
                    length={length}
                    note={cSlideData ? cSlideData.note : null}
                    prevSlide={this.prevSlide}
                    nextSlide={this.nextSlide}/>
                </Responsive>
            </div>
        )
    }
};

Slides = Socket(Slides);
Slides = withRouter(Slides);

export default Slides;


