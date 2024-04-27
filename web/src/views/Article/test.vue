<style>
.article {
    overflow: hidden;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;
    background-color: #fff;

    .title {
        font-size: 2.5rem;
        color: #000000;
        margin-top: 60px;
        margin-bottom: 1rem;
        font-weight: bold;
        text-align: center;
    }

    .categoryItem {
        overflow: auto;
        background-color: #f8f8f8;
        line-height: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.279);
        padding: 2rem;
        margin: 1.5rem auto;
        width: 60%;
        transition: all 0.3s ease-in-out;

        h2 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 10px;
        }

        p {
            font-size: 0.8rem;
            color: #666;
            line-height: 1.5;
        }

        &:hover {
            cursor: pointer;
            box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.279);
        }
    }

    .divider {
        width: 100%;
        height: 2px;
        background-color: #ada3a349;
        margin-bottom: 3rem;
    }
}
</style>