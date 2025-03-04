export const saveModel = (model) => {
    localStorage.setItem("trainedModel", JSON.stringify(model));
};

export const loadModel = () => {
    const savedModel = localStorage.getItem("trainedModel");
    return savedModel ? JSON.parse(savedModel) : null;
};
