import React from "react";
import "./App.css";
import { Button, Col, Input, Row, Table, Typography, Badge } from "antd";
const { Text } = Typography;

function App() {
    const [promoCodeValue, setPromoCodeValue] = React.useState<string>("");
    const [validPromos] = React.useState<string[]>([
        "SALE13",
        "SALE25",
        "SALE40",
    ]);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState<{ [index: string]: number }>({
        starter: 30,
        premium: 54,
        enterprize: 99,
    });

    const getPercentageDiff = React.useCallback(
        (totalAmount: number, percent: number) => {
            return +totalAmount - (+percent / 100) * +totalAmount;
        },
        []
    );

    const onPromoCodeChange = React.useCallback(
        (event: any) => {
            setPromoCodeValue(event.target.value);
            if (event.target.value === "") {
                setIsError(false);
                setAmount({
                    ...amount,
                    starter: 30,
                    premium: 54,
                    enterprize: 99,
                });
                return;
            }
            if (!validPromos.includes(event.target.value)) {
                setIsError(true);
                setAmount({
                    ...amount,
                    starter: 30,
                    premium: 54,
                    enterprize: 99,
                });
                return;
            } else {
                setIsError(false);
            }
            switch (event.target.value) {
                case "SALE13": {
                    const updateValue1 = getPercentageDiff(amount.starter, 13);
                    const updateValue2 = getPercentageDiff(amount.premium, 13);
                    const updateValue3 = getPercentageDiff(
                        amount.enterprize,
                        13
                    );
                    setAmount({
                        ...amount,
                        starter: updateValue1,
                        premium: updateValue2,
                        enterprize: updateValue3,
                    });
                    break;
                }
                case "SALE25": {
                    const updateValue = getPercentageDiff(amount.premium, 25);
                    const updateValue2 = getPercentageDiff(amount.premium, 25);
                    const updateValue3 = getPercentageDiff(
                        amount.enterprize,
                        25
                    );
                    setAmount({
                        ...amount,
                        starter: updateValue,
                        premium: updateValue2,
                        enterprize: updateValue3,
                    });
                    break;
                }
                case "SALE40": {
                    const updateValue = getPercentageDiff(
                        amount.enterprize,
                        40
                    );
                    const updateValue2 = getPercentageDiff(amount.premium, 40);
                    const updateValue3 = getPercentageDiff(
                        amount.enterprize,
                        40
                    );
                    setAmount({
                        ...amount,
                        starter: updateValue,
                        premium: updateValue2,
                        enterprize: updateValue3,
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        },
        [amount, getPercentageDiff]
    );

    const starterDataSource = [
        {
            key: "1",
            name: "Feature list 1",
        },
        {
            key: "2",
            name: "$" + amount.starter,
            button: (
                <Button type="primary" size={"small"}>
                    Get it now
                </Button>
            ),
        },
    ];

    const premiumDataSource = [
        {
            key: "1",
            name: "Feature list 2",
        },
        {
            key: "2",
            name: "$" + amount.premium,
            button: (
                <Button type="primary" size={"small"}>
                    Get it now
                </Button>
            ),
        },
    ];

    const enterprizeDataSource = [
        {
            key: "1",
            name: "Feature list 3",
        },
        {
            key: "2",
            name: "$" + amount.enterprize,
            button: (
                <Button type="primary" size={"small"}>
                    Get it now
                </Button>
            ),
        },
    ];

    const starterColumns = [
        {
            title: "Starter",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "button",
            key: "button",
        },
    ];

    const premiumColumns = [
        {
            title: "Premium",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "button",
            key: "button",
        },
    ];

    const enterprizeColumns = [
        {
            title: "Enterprize",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "button",
            key: "button",
        },
    ];

    return (
        <div className="container">
            <div className="App">
                <div className="App-header">
                    <Row className="width-100" gutter={[24, 24]}>
                        <Col className="gutter-row" span={24}>
                            <h1>Pricing</h1>
                        </Col>
                    </Row>
                    <Row className="width-100" gutter={[24, 24]}>
                        <Col className="gutter-row" span={8}>
                            <Table
                                dataSource={starterDataSource}
                                columns={starterColumns}
                                pagination={false}
                            />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Badge.Ribbon text="Popular" color="pink">
                                <Table
                                    dataSource={premiumDataSource}
                                    columns={premiumColumns}
                                    pagination={false}
                                />
                            </Badge.Ribbon>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Table
                                dataSource={enterprizeDataSource}
                                columns={enterprizeColumns}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <Row className="width-100" gutter={[24, 24]}>
                        <Col className="gutter-row" span={24}>
                            <h4>I have a promo code</h4>
                        </Col>
                    </Row>
                    <Row className="width-100" gutter={[24, 24]}>
                        <Col className="gutter-row" span={8}>
                            <Input
                                placeholder="Promo code"
                                onChange={onPromoCodeChange}
                                value={promoCodeValue}
                                status={isError ? "error" : ""}
                            />
                            {isError && (
                                <Text type="danger">Code does not exit</Text>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default App;
