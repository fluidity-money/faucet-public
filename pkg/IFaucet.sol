// SPDX-Identifier: MIT
pragma solidity 0.8.16;

interface IFaucet {
    /**
     * @notice sendTo the recipients given, with the amount being randomly chosen.
     * @dev will break if there's not enough to send... by design.
     * @dev will break if it tries to send to a contract. The callee should verify that
     *      they're not being asked to send to contracts.
     */
    function sendTo(address[] calldata _requests) external;
}
