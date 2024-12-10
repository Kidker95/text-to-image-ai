import { useForm } from "react-hook-form";
import { ParamsModel } from "../../../Models/ParamsModel";
import "./Generator.css";
import { notify } from "../../../Utils/Notify";
import { generatorService } from "../../../Services/GeneratorService";
import { promptEngineeringService } from "../../../Services/PromptEngineeringService";
import { useState } from "react";
import { Spinner } from "../../SharedArea/Spinner/Spinner";

export function Generator(): JSX.Element {
    const { register, handleSubmit } = useForm<ParamsModel>();
    const [imageUrl, setImageUrl] = useState<string>(null);
    const [showForm, setShowForm] = useState<boolean>(true);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);

    const send = async (params: ParamsModel) => {
        try {
            setImageUrl("");
            setShowForm(false);
            const prompt = promptEngineeringService.getPrompt(params);
            const imageUrl = await generatorService.generateImage(prompt);
            setImageUrl(imageUrl);

            // Show the "Next Image?" button after 3 seconds
            setTimeout(() => setShowNextButton(true), 3000);
        } catch (err: any) {
            notify.error(err.message);
            setShowForm(true); // Show the form again in case of error
        }
    };

    const resetPage = () => {
        setImageUrl(null);
        setShowForm(true);
        setShowNextButton(false);
    };

    return (
        <div className="Generator">
            {showForm && (
                <form onSubmit={handleSubmit(send)}>
                    <h3>Fill the form, hit "Generate", and get ready to go!</h3>
                    <label>Image Description: </label>
                    <textarea {...register("description")}></textarea>

                    <label>Image Style:</label>
                    <input type="text" {...register("style")} list="styles" />

                    <datalist id="styles">
                        <option value="Realistic" />
                        <option value="Cartoon" />
                        <option value="Pixel Art" />
                        <option value="Abstract" />
                        <option value="Minimalist" />
                        <option value="3D Render" />
                        <option value="Fantasy" />
                        <option value="Cyberpunk" />
                        <option value="Watercolor" />
                        <option value="Surreal" />
                        <option value="Pop Art" />
                    </datalist>

                    <button disabled={imageUrl === ""}>Generate</button>
                </form>
            )}
            {imageUrl === "" && <Spinner />}
            {imageUrl && (
                <>
                    <img src={imageUrl} alt="Generated result" />
                    {showNextButton && (
                        <button className="fade-in" onClick={resetPage}>Next Image?</button>
                    )}
                </>
            )}
        </div>
    );
}
