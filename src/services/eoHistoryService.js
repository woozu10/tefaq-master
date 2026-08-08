export function saveEOHistory(
    topic,
    transcript,
    result
){

    const history =
        JSON.parse(
            localStorage.getItem("eoHistory")||"[]"
        );

    history.unshift({

        date:new Date().toISOString(),

        topic,

        transcript,

        result

    });

    localStorage.setItem(
        "eoHistory",
        JSON.stringify(history)
    );

}
