import React, { Component } from "react";
import initPhotoSwipeFromDOM from "./init";

export default class BasePhotoSwipe extends Component {
  constructor(props) {
    super(props);
    this._imageListId = ehealth.guid.get();
    this._swipeDivId = ehealth.guid.get();
  }

  _loadScript = (src, callback) => {
    let script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (typeof callback === "function") {
        callback();
      }
    };
    document.body.appendChild(script);
  };

  _loadCss = (src) => {
    let link = document.createElement("link");
    link.href = src;
    link.rel = "stylesheet";
    document.body.appendChild(link);
  };

  _init = () => {
    initPhotoSwipeFromDOM("." + this._imageListId, this._swipeDivId);
  };

  render() {
    let { items, thumbnailContent } = this.props;
    return (
      <React.Fragment>
        <div>
          <div className={this._imageListId} itemScope>
            {items.map((i) => {
              let size = i.w + "x" + i.h;
              return (
                <figure
                  style={{ display: "contents" }}
                  key={"photo" + i.thumbnail}
                  itemProp="associatedMedia"
                  itemScope
                  itemType="http://schema.org/ImageObject"
                >
                  <a href={i.src} itemProp="contentUrl" data-size={size}>
                    {thumbnailContent(i)}
                  </a>
                </figure>
              );
            })}
          </div>
          <div
            className="pswp"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            id={this._swipeDivId}
          >
            <div className="pswp__bg"></div>
            <div className="pswp__scroll-wrap">
              <div className="pswp__container">
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
              </div>
              <div className="pswp__ui pswp__ui--hidden">
                <div className="pswp__top-bar">
                  <div className="pswp__counter"></div>
                  <button
                    className="pswp__button pswp__button--close"
                    title="Close (Esc)"
                  ></button>
                  <button
                    className="pswp__button pswp__button--fs"
                    title="Toggle fullscreen"
                  ></button>
                  <button
                    className="pswp__button pswp__button--zoom"
                    title="Zoom in/out"
                  ></button>
                  <div className="pswp__preloader">
                    <div className="pswp__preloader__icn">
                      <div className="pswp__preloader__cut">
                        <div className="pswp__preloader__donut"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div className="pswp__share-tooltip"></div>
                </div>
                <button
                  className="pswp__button pswp__button--arrow--left"
                  title="Previous (arrow left)"
                ></button>
                <button
                  className="pswp__button pswp__button--arrow--right"
                  title="Next (arrow right)"
                ></button>
                <div className="pswp__caption">
                  <div className="pswp__caption__center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (!window.hasPhotoSwipeScript) {
      window.hasPhotoSwipeScript = true;
      this._loadCss(
        ehealth.getPath("/Content/PhotoSwipe-master/dist/photoswipe.css")
      );
      this._loadCss(
        ehealth.getPath(
          "/Content/PhotoSwipe-master/dist/default-skin/default-skin.css"
        )
      );
      this._loadScript(
        ehealth.getPath("/Content/PhotoSwipe-master/dist/photoswipe.js"),
        () => {
          this._loadScript(
            ehealth.getPath(
              "/Content/PhotoSwipe-master/dist/photoswipe-ui-default.min.js"
            ),
            () => {
              this._init();
            }
          );
        }
      );
    } else {
      this._init();
    }
  }
}
