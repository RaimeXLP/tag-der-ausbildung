/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ButtonDescriptor } from "@workadventure/iframe-api-typings";
import { ActionBarButtonDescriptor } from "@workadventure/iframe-api-typings/front/Api/Iframe/Ui/ButtonActionBar";

class WAE {
    buttons: {
        close: ButtonDescriptor,
    } = {
        close: {
            label: "Schließen",
            className: "primary",
            callback: (popup) => {
                popup.close();
            }
        },
    }

    constructor (){
    }

    async init(){
        WA.onInit().then(() => {
            console.log('Scripting API ready');
            console.log('Player tags: ',WA.player.tags)
            
            // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
            bootstrapExtra().then(() => {
                console.log('Scripting API Extra ready');
            }).catch(e => console.error(e));
        
        }).catch(e => console.error(e));
    }

    popUp(area: string, display: string, text: string, buttons: ButtonDescriptor[]){
        let currentPopup: any = undefined;
        WA.room.area.onEnter(area).subscribe(() => {
            currentPopup = WA.ui.openPopup(display, text, buttons);
        });
    
        WA.room.area.onLeave(area).subscribe(closePopup);
        function closePopup(){
            if (currentPopup !== undefined) {
                currentPopup.close();
                currentPopup = undefined;
            }
        }
    }

    modal(title: string, src: string, api: boolean){
        WA.ui.modal.openModal({
            position: "right",
            title: title,
            src: src,
            allow: "fullscreen",
            allowApi: api
        });
    }

    modalOnArea(area: string, title: string, src: string, api: boolean){
        let currentModal: any = undefined;
        WA.room.area.onEnter(area).subscribe(() => {
            currentModal = WA.ui.modal.openModal({
                position: "right",
                title: title,
                src: src,
                allow: "fullscreen",
                allowApi: api
            });
        });
        WA.room.area.onLeave(area).subscribe(closeModal);
        function closeModal(){
            if (currentModal !== undefined) {
                currentModal.close();
                currentModal = undefined;
            }
        }
    }

    actionButton(button: ActionBarButtonDescriptor){
        WA.ui.actionBar.addButton(button);
    }

    minimapButton(){
        WA.ui.actionBar.addButton({
            "id":"minimap",// @ts-ignore
            "type":"action",
            "imageSrc":"https://buenni86.github.io/tag-der-ausbildung/src/mapLogo.png",
            "toolTip":"Minimap",
            "callback": () => {
                WA.nav.openCoWebSite("https://google.com");
            }
        })
    }
}

export default WAE;